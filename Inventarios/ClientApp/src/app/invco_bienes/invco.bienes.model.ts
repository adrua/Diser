export enum EnumINVCOBienTipo {
  'Mueble' = 'MB',
  'Inmueble' = 'IM'
}

export enum EnumINVCOBienEstadoActual {
  'Activo' = 'AC',
  'Cancelado' = 'CN',
  'Entregado' = 'EN',
  'Anulado' = 'AN'
}

export class INVCO_BienesModel {
    public compania: number = 1;
    public invcoBienId: number = 0;
    public invcoBienNombre: string;
    public invcoBienDescripcion: string;
    public invcoBienTipo: EnumINVCOBienTipo = EnumINVCOBienTipo['Mueble'];
    public invcoBienSerial: string;
    public invcoBienValorCompra: number = 0.0;
    public invcoBienFechaCompra: Date;
    public invcoBienEstadoActual: EnumINVCOBienEstadoActual = EnumINVCOBienEstadoActual['Entregado'];
    public invcoAreaId: number;
    public invcoPersonaId: number;
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;
    public relaciones: any;

    constructor(json: any = null) {
        this.relaciones = {};
        if (json !== null) {
            this.invcoBienId = json.invcoBienId;
            this.invcoBienNombre = json.invcoBienNombre;
            this.invcoBienDescripcion = json.invcoBienDescripcion;
            this.invcoBienTipo = json.invcoBienTipo;
            this.invcoBienSerial = json.invcoBienSerial;
            this.invcoBienValorCompra = json.invcoBienValorCompra;
            this.invcoBienFechaCompra = json.invcoBienFechaCompra;
            this.invcoBienEstadoActual = json.invcoBienEstadoActual;
            this.invcoAreaId = json.invcoAreaId;
            this.invcoPersonaId = json.invcoPersonaId;
        }
    }
}
