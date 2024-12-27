export const ABI = [
    {
      "type": "impl",
      "name": "contadorImpl",
      "interface_name": "basecamp11::Icontador"
    },
    {
      "type": "interface",
      "name": "basecamp11::Icontador",
      "items": [
        {
          "type": "function",
          "name": "Consultar",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u32"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "Sumar_uno",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "Restar_uno",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "Restablecer",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "Restablecer_no_owner",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "impl",
      "name": "OwnableTwoStep",
      "interface_name": "openzeppelin_access::ownable::interface::IOwnableTwoStep"
    },
    {
      "type": "interface",
      "name": "openzeppelin_access::ownable::interface::IOwnableTwoStep",
      "items": [
        {
          "type": "function",
          "name": "owner",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "pending_owner",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "accept_ownership",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "transfer_ownership",
          "inputs": [
            {
              "name": "new_owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "renounce_ownership",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "init_value",
          "type": "core::integer::u32"
        },
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "type": "event",
      "name": "basecamp11::contador::contadorIncreased",
      "kind": "struct",
      "members": [
        {
          "name": "contador",
          "type": "core::integer::u32",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "basecamp11::contador::contadorDecreased",
      "kind": "struct",
      "members": [
        {
          "name": "contador",
          "type": "core::integer::u32",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      "kind": "struct",
      "members": [
        {
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      "kind": "struct",
      "members": [
        {
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "OwnershipTransferred",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          "kind": "nested"
        },
        {
          "name": "OwnershipTransferStarted",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "basecamp11::contador::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "contadorIncreased",
          "type": "basecamp11::contador::contadorIncreased",
          "kind": "nested"
        },
        {
          "name": "contadorDecreased",
          "type": "basecamp11::contador::contadorDecreased",
          "kind": "nested"
        },
        {
          "name": "OwnableEvent",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
          "kind": "flat"
        }
      ]
    }
] as const;