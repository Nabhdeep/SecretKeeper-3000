# SecretKeeper 3000
## Secure Messaging Platform

SecretKeeper 3000 is a secure messaging platform that enables users to encrypt and share sensitive information via a sharable link.

## How it Works
1. Message Encryption: Messages are encrypted on the client-side using AES with a random 64-bit key.
2. Key Management: Encryption keys are never sent to the backend server.
3. Sharable Link: Encrypted messages are stored on the backend server with a unique UUID, accessible via a sharable link containing the encryption key as a hash parameter.
4. Optional Password: Additional passphrase protection ensures only designated recipients can access the message.
5. TTL and Access Limit: Messages are only valid until a user-defined TTL expires or the access limit is reached.

## Security Features
- End-to-end encryption ensures authorized access only
- Unique keys prevent unauthorized access
- Optional password protection adds extra security
- Server never receives encryption keys
- AES encryption with random 64-bit keys

## Usage
1. Submit a message and choose to add an optional password.
2. Share the generated link with others.
3. Recipients access the message by clicking the link and entering the password (if set).
4. The message can be viewed until the TTL expires or access limit is reached.

## Note
SecretKeeper 3000 prioritizes security and privacy. However, users should still exercise caution when sharing sensitive information online.