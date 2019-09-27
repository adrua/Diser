export class ModulosModel {
    public aplicacionCodigo: number;
    public moduloCodigo: number;
    public moduloNombre: string;
    public moduloDescripcion: string;

    public _secuencia: number;
    public _estado: string = 'N';
    public _id: string;
    public _v: number;
    public _relaciones: any;

    constructor(json: any = null) {
        this._relaciones = {};
        if (json !== null) {
            this.aplicacionCodigo = json.aplicacionCodigo;
            this.moduloCodigo = json.moduloCodigo;
            this.moduloNombre = json.moduloNombre;
            this.moduloDescripcion = json.moduloDescripcion;
        }
    }
    
    toClipboard(): string {
        var result = '';
        
        result += `\t${this.aplicacionCodigo}`;
        result += `\t${this.moduloCodigo}`;
        result += `\t${this.moduloNombre}`;
        result += `\t${this.moduloDescripcion}`;
 
        return result.substring(1);
    }
    
    fromClipboard(value: string): ModulosModel {
        var result = value.split('\t');
        
        this.aplicacionCodigo = <number>(<any>(result[0]));
        this.moduloCodigo = <number>(<any>(result[1]));
        this.moduloNombre = <string>(<any>(result[2]));
        this.moduloDescripcion = <string>(<any>(result[3]));
 
        return this;
    }    
}