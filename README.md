ERC-721, An Improved Standard

The ERC-721 standard has become very popular these days. In NFTStudio we have thought about how to make the NFT standard a little more interesting by attaching additional information to the OpenZeppelin proposed [HERE](https://docs.openzeppelin.com/contracts/3.x/erc721). 

We hope that our proposals are interesting. 
If you would like to propose changes or add comments, please feel free to open an [issue](https://github.com/Nft-Studio/erc721-improved-standard/issues).


Licenses

First of all, given the application of NFTs in the fields of art or music, we thought about licenses. We believe there are at least two issues to address when pushing something digital on the internet and the blockchain:
a public license issue, originating from uploading the file to the archive or because it is visible on servers and websites;
an owner / creator licensing issue as the file, coined as NFT, was created by a party who owns it;
To solve the licensing issue we have decided to use the [Creative Commons](https://creativecommons.org/) licenses, as they are already accepted by the artists and because they specify the permitted use of a file distributed on the Internet.
For the owner license we use the [Nifty](https://www.niftylicense.org/)  license, already widely adopted in the blockchain space.

Of course it is possible to add other licenses: our contribution lies in having identified the need, in our opinion, to add them directly in the metadata.


Certificate of Authenticity

A work of art cannot be considered original without its certificate of authenticity. Consequently, the CA will also have to be added in the metadata, so that every buyer can be 100% sure that the file is original and issued directly by the author. You can find our CA elaboration [HERE](./CA-Standard.txt).

As you can see, we have attached all important information regarding the artist and / or author and the file.

An additional important information is represented by the digital identity of the artist, which is typically represented by the public address of his wallet.

As Tim Daubenschütz has exposed [HERE](https://timdaub.github.io/2021/04/22/nft-sleepminting-beeple-provenance/), we cannot rely only on a token issued by someone as anyone can mint a token directly on another's account.
We will explain our improvement in the next paragraph.


Cryptographical proof

As is widely known, a digital identity is made up of a pair of keys, one public and one private. When we have to expose our key we use the public key, as we do to indicate the artist's identity.
On the other hand, when it is necessary to identify yourself (sign) to carry out transactions or otherwise, we use the private key. By signing the data, a cryptographic proof is generated which can be used to verify if an address has actually signed the data.

Adding this proof to our NFT implies that even if someone coined the NFT on behalf of an author / artist (eg a platform that carries out the minting by taking on the fees) it is always possible to verify that the author has given the consent creation of the NFT.

We have created two simple tools for signing and verifying proofs: you can use them to create the proof and use this template to paste the proof. 
The object of the test must be the CA, which possess all the fundamental information of the NFT itself.
We can therefore argue that the NFT is the CA and not the media file itself.

If you want to test and use our tools, you can install node dependencies:
cd signing-tools
npm install

To sign a message, provide a private key in the parameter p and a message in the parameter m:
node sign -p=4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0 -m='Hello World'

The result will be:
SIGNATURE:  0xbe7c7df2ba38d81a197329247bfdb9ab16a771e3fc80843249d6290898ef83d0025893a360ea234265f9ea92c197bf034b7a6a4c8e303042cf440a33bbbb92861c
SIGNED BY ADDRESS: 0x29c76e6ad8f28bb1004902578fb108c507be341b

To verify a message provide the signature in the parameter s and the message in the parameter m:
node verify -s=0xbe7c7df2ba38d81a197329247bfdb9ab16a771e3fc80843249d6290898ef83d0025893a360ea234265f9ea92c197bf034b7a6a4c8e303042cf440a33bbbb92861c -m='Hello World'

The result will be:
THIS MESSAGE WAS SIGNED BY ADDRESS: 0x29c76e6ad8f28bb1004902578fb108c507be341b

As you can see we have cryptographically proved that 0x29c76e6ad8f28bb1004902578fb108c507be341b signed the message Hello World.


Storage

Another important issue regarding NFTs, if we assume that this NFT should be easily reproduced, is the storage of the files themselves.

All the information present in the metadata are links, which means that the files they refer to must be hosted somewhere on the Internet, inside servers that are constantly (and theoretically forever) ready to provide what is requested.

One of the simplest solutions to make sure a file exists forever is, as always, to use a standard created for it. Fortunately, this standard exists and is called [IPFS](https://ipfs.io/). 
If you're new to IPFS, don't worry: there are plenty of easy services (like [Textile](https://textile.io/) or [Pinata](https://pinata.cloud/)) that make the upload and pinning process easier.

As mentioned above, there are two things we can do to make sure our files are always available. The first is to use a standard and upload the file to any IPFS node. The second is pinning, which is the operation of making a file persistent over IPFS.

Using one of the services mentioned above, pinning will be done on its own. If you prefer to do it independently or using your IPFS node you have to start from [HERE](https://docs.ipfs.io/concepts/persistence/#persistence-versus-permanence).


Anatomy of an NFT

The proposed improvements can be easily understood by analyzing the json, of which you can find a copy HERE:
{
    "name": "<TITLE>",
    "description": "<DESCRIPTION>\n\n\n--\n\n\nPublic License:\n<PUBLIC_LICENSE>\n\nOwner License:\n<OWNER_LICENSE>\n\nCertificate of Authenticity:\n<CA_IPFS_HASH>",
    "image": "<IMAGE_IPFS_HASH>",
    "external_url": "<EXTERNAL_URL>",
    "certificate_of_authenticity": "<CA_IPFS_HASH>",
    "owner_license": "<OWNER_LICENSE_IPFS_HASH>",
    "public_license": "<PUBLIC_LICENSE_IPFS_HASH>",
    "proof": "<PROOF_IPFS_HASH>"
    }


