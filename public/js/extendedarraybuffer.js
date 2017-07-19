class ExtendedArrayBuffer extends ArrayBuffer {
    constructor(buffer){
        super(buffer.byteLength);
        this.buffer = new ArrayBuffer(buffer);
    }
    append(bufferToAppend){
        let tmp = new Uint8Array(this.byteLength + bufferToAppend.byteLength)
        tmp.set( new Uint8Array( this.buffer ), 0 );
        tmp.set( new Uint8Array( bufferToAppend ), this.byteLength );
        this.buffer = tmp.buffer;
        return tmp.buffer
    }
}
