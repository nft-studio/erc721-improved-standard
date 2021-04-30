# ERC-721 Improved Standard

As we know ERC-721 became very popular during these days so we started our research to make the NFT standard a little bit more interesting, attaching more than few informations as OpenZeppelin proposed [here](https://docs.openzeppelin.com/contracts/3.x/erc721). Here we'll write our proposals and we hope you find them interesting. If you need to propose changes yourself or just add comments, feel free to open an [issue](https://github.com/Nft-Studio/erc721-improved-standard/issues).

## Licenses

First of all, as many and many uses NFTs for art or music we started thinking about licenses. We need to understand that there's a double "problem" when we push something digital on the internet and the blockchain because there is:

- a public license, because the file is uploaded somewhere or visibile in several websites
- an owner license, because the file, minted as NFT, is created and is owned by someone

For the first license we decided to use one of the [Creative Commons](https://creativecommons.org/) licenses, because that licenses are accepted by artists and guarantees what can you do with a file found on the internet.

For the second license we decide to use [Nifty](https://www.niftylicense.org/) license, because is widely adopted in the blockchain space.

Of course there's no limitation about the license you want to apply, we just discovered the need to apply a license directly into the metadata.

## Certificate of Authenticity

Each piece of art is nothing without the certificate of authenticity. We must understand that and we need to add the CA directly into the metadata so any buyer can be 100% sure that the file is original and issued directly by the author. You can find a standard CA [here](./CA-Standard.txt).

As you can see we attached all important informations of the artist or author and all the informations about the file. Another important piece is the digital identity of the artist, which is tipically represented by its public address. As Tim Daubenschütz exposed [here](https://timdaub.github.io/2021/04/22/nft-sleepminting-beeple-provenance/) we can't rely only to a token issued by someone because anyone can mint a token directly to other's account. So let explain our improvement in the next paragraph.

## Cryptographical proof

As anyone knows a digital identity is a pair of keys, one public and one private. When we must expose our key we use the public key as mentioned above. When we need to *sign* data like transactions or other informations we use the private key. When we *sign* data we produce a cryptographical proof which can be used to *verify* if that address really signed the data itself. 

Adding this proof to our NFT means that, even if someone can *mint* the NFT for the author (ex. a platform that want to spend the fees for the minting), we can always verify that the author created that NFT with its will.

We created two simple tools to *sign* and *verify* proofs, you can use it to create the proof and use [this](./Proof-Standard.txt) template to paste the proof. The subject of the Proof must be the CA, which have all the fundamental informations of the NFT itself. We can say that the NFT is the CA and not the multimedia file itself.

If you want to use our tools simply install `node` dependencies:

```
cd signing-tools
npm install
```

To sign a message provide a private key in the parameter `p` and a message in the parameter `m`:

```
node sign -p=4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0 -m='Hello World'
```

The result will be:

```
SIGNATURE:  0xbe7c7df2ba38d81a197329247bfdb9ab16a771e3fc80843249d6290898ef83d0025893a360ea234265f9ea92c197bf034b7a6a4c8e303042cf440a33bbbb92861c
SIGNED BY ADDRESS: 0x29c76e6ad8f28bb1004902578fb108c507be341b
```

To verify a message provide the signature in the parameter `s` and the message in the parameter `m`:

```
node verify -s=0xbe7c7df2ba38d81a197329247bfdb9ab16a771e3fc80843249d6290898ef83d0025893a360ea234265f9ea92c197bf034b7a6a4c8e303042cf440a33bbbb92861c -m='Hello World'
```

The result will be:

```
THIS MESSAGE WAS SIGNED BY ADDRESS: 0x29c76e6ad8f28bb1004902578fb108c507be341b
```

As you can see we have proven cryptographically that `0x29c76e6ad8f28bb1004902578fb108c507be341b` signed the message `Hello World`.

## Storage

Another important part of the NFT, if we suppose that this NFT should be easily reproduced, is the storage of the files itself. All the metadata informations are links, which means that must be hosted somewher on the internet, in servers that are always (and maybe forever) ready to answer for the informations.

One of the easiest solution to make sure that a file exists forever is, again, use a standard that's born for that. Fortunately this standard exists and it's called [IPFS](https://ipfs.io/). If you don't know IPFS don't worry, there are a lot of easy services (like [Textile](https://textile.io/) or [Pinata](https://pinata.cloud/)) that makes the process of upload and *pinning* easy.

As we mentioned above there are two operations to make sure our files are always available. First is use a standard and upload the file to any IPFS node, another important part is *pinning* which is the operation of make a file persistent on IPFS. If you use one of the above services don't worry they do the pinning for you, if you want to do privately or with you IPFS node you must start from [here](https://docs.ipfs.io/concepts/persistence/#persistence-versus-permanence).

## Anatomy of an NFT

At the end of the improvements we can easily understand how the `json` itself will look like and you can find a copy [here](./NFT-Standard.json):

```
{
    "name": "<TITLE>",
    "description": "<DESCRIPTION>\n\n\n--\n\n\nPublic License:\n<PUBLIC_LICENSE>\n\nOwner License:\n<OWNER_LICENSE>\n\nCertificate of Authenticity:\n<CA_IPFS_HASH>",
    "image": "<IMAGE_IPFS_HASH>",
    "external_url": "<EXTERNAL_URL>",
    "certificate_of_authenticity": "<CA_IPFS_HASH>",
    "owner_license": "<OWNER_LICENSE_IPFS_HASH>",
    "public_license": "<PUBLIC_LICENSE_IPFS_HASH>"
}
```