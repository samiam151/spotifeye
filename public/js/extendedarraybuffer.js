class ExtendedArrayBuffer extends ArrayBuffer {
    constructor(byteLength = 0){
        super(byteLength);
        this.buffer = new ArrayBuffer(byteLength)
    }
    append(bufferToAppend){
        let tmp = new Uint8Array(this.byteLength + bufferToAppend.byteLength)
        tmp.set( new Uint8Array( this ), 0 );
        tmp.set( new Uint8Array( bufferToAppend ), this.byteLength );
        this.buffer = tmp.buffer;
        return tmp.buffer
    }
}
