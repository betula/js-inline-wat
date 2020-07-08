const encoded = 'AGFzbQEAAAABCQJgAn9/AGAAAAIZAgdjb25zb2xlA2xvZwAAAmpzA21lbQIAAQMCAQEHCwEHd3JpdGVIaQABCgoBCABBAEECEAALCwgBAEEACwJIaQ==';
const decoded = atob(encoded);
const len = decoded.length;
const bytes = new Uint8Array(len);

for (var i = 0; i < len; i++) {
    bytes[i] = decoded.charCodeAt(i);
}

export default bytes;
