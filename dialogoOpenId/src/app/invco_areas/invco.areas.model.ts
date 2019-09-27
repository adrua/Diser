export enum EnumINVCOAreaEstado {
  'Activo' = 'AC',
  'Cancelado' = 'CN',
  'Anulado' = 'AN'
}

export class INVCO_AreasModel {
    public compania: number = 1;
    public invcoAreaId: number = 0;
    public invcoAreaDescripcion: string;
    public invcoAreaEstado: EnumINVCOAreaEstado = EnumINVCOAreaEstado['AC'];
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;
    public relaciones: any;

    constructor(json: any = null) {
        this.relaciones = {};
        if (json !== null) {
            this.invcoAreaId = json.invcoAreaId;
            this.invcoAreaDescripcion = json.invcoAreaDescripcion;
            this.invcoAreaEstado = json.invcoAreaEstado;
        }
    }
}
