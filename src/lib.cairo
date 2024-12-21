#[starknet::interface]
pub trait Icontador<TContractState> {
    fn Consultar(self: @TContractState) -> u32;
    fn Sumar_uno(ref self: TContractState);
    fn Restar_uno(ref self: TContractState);
    fn Restablecer(ref self: TContractState);
    fn Restablecer_no_owner(ref self: TContractState);
}

#[starknet::contract]
mod contador {
    use super::Icontador;
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::ContractAddress;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    //Ownable Mixin
    #[abi(embed_v0)]
    impl OwnableTwoStep = OwnableComponent::OwnableTwoStepImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        contador: u32,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        contadorIncreased: contadorIncreased,
        contadorDecreased: contadorDecreased,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    #[derive(Drop, starknet::Event)]
    struct contadorIncreased {
        contador: u32,
    }

    #[derive(Drop, starknet::Event)]
    struct contadorDecreased {
        contador: u32,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_value: u32, owner: ContractAddress) {
        self.contador.write(init_value);
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl contadorImpl of Icontador<ContractState> {
        fn Consultar(self: @ContractState) -> u32 {
            self.contador.read()
        }

        fn Sumar_uno(ref self: ContractState) { //funcion sumar, llama al estado del contrato, (Valor)
            let old_contador = self.contador.read();
            let new_contador = old_contador + 1;
            self.contador.write(new_contador);
            self.emit(contadorIncreased { contador: new_contador });
        }

        fn Restar_uno(ref self: ContractState) { //funcion restar, llama al estado del contrato, (Valor)
            let old_contador = self.contador.read(); // leer el contador y asignar valor a contador antiguo
            assert(old_contador > 0, 'ya valgo 0'); // asert emite un aviso si se cmple X condicion
            let new_contador = old_contador - 1; // el contador nuevo valdra lo que el antiguo menos 1
            self.contador.write(new_contador); // escribir en contador el valor de contador nuevo
            self.emit(contadorDecreased { contador: new_contador }); // enviar los valores a la cadena
        }

        fn Restablecer(ref self: ContractState) { //funcion restablecer, llama al estado del contrato, (Valor)
            self.ownable.assert_only_owner(); // solo el Owner del contrato puede llamar esta funcion 
            self.contador.write(0);
        }
        
        fn Restablecer_no_owner(ref self: ContractState) { //funcion restablecer, llama al estado del contrato, (Valor)
            //self.ownable.assert_only_owner(); // ELIMINADO PARA PRUEBAS 
            self.contador.write(0);
        }
    }
}
