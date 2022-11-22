const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const Struct = [
    {
        name:"_name",
        type: "string"
    },
    {
        name:"_age",
        type:"uint8"
    }
]
const DomainData = {
    chainId: 1,
    // Give a user friendly name to the specific contract you are signing for.
    name: "EIP712_BTD",
    // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
    verifyingContract: "",
    // Just let's you know the latest version. Definitely make sure the field name is correct.
    version: "1",
  }

const Message = {
    contents: "Hello, Bob!",
    _name:"won",
    _age:28
}

const msgParams = JSON.stringify({
    domain:DomainData,
    message:Message,
    primaryType:"SignUpData",
    types: {
        EIP712Domain:EIP712Domain,
        SignUpData:Struct
    }
})



const _msgParams = JSON.stringify({
  domain: {
  },

  // Defining the message signing data content.
  message: {
    contents: "Hello, Bob!",
    attachedMoneyInEth: 4.2,
    from: {
      name: "Cow",
      wallets: [
        "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
      ],
    },
    to: [
      {
        name: "Bob",
        wallets: [
          "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
          "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
          "0xB0B0b0b0b0b0B000000000000000000000000000",
        ],
      },
    ],
  },
  // Refers to the keys of the *types* object below.
  primaryType: "Mail",
  types: {
    EIP712Domain: EIP712Domain,
    // Not an EIP712Domain definition
    // Group: [
    //   { name: "name", type: "string" },
    //   { name: "members", type: "Person[]" },
    // ],
    // // Refer to PrimaryType
    // Mail: [
    //   { name: "from", type: "Person" },
    //   { name: "to", type: "Person[]" },
    //   { name: "contents", type: "string" },
    // ],
    // // Not an EIP712Domain definition
    // Person: [
    //   { name: "name", type: "string" },
    //   { name: "wallets", type: "address[]" },
    // ],
  },
});
