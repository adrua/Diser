export enum EnumINVCOPersonaEstado {
  'Activo' = 'AC',
  'Cancelado' = 'CN',
  'Anulado' = 'AN'
}

export class INVCO_PersonasModel {
    public compania: number = 1;
    public invcoPersonaId: number;
    public invcoPersonaApellidos: string;
    public invcoPersonaNombre: string;
    public invcoPersonaDireccion: string;
    public govcoPaisId: string;
    public govcoDepartamentoId: string;
    public govcoCiudadId: string;
    public govco_Ciudades_Comp: string;
    public invcoPersonaTelefono: string;
    public invcoPersonaEMail: string;
    public invcoAreaId: number;
    public invcoPersonaEstado: EnumINVCOPersonaEstado = EnumINVCOPersonaEstado['Activo'];
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;
    public relaciones: any;

    constructor(json: any = null) {
        this.relaciones = {};
        if (json !== null) {
            this.invcoPersonaId = json.invcoPersonaId;
            this.invcoPersonaApellidos = json.invcoPersonaApellidos;
            this.invcoPersonaNombre = json.invcoPersonaNombre;
            this.invcoPersonaDireccion = json.invcoPersonaDireccion;
            this.govcoPaisId = json.govcoPaisId;
            this.govcoDepartamentoId = json.govcoDepartamentoId;
            this.govcoCiudadId = json.govcoCiudadId;
            this.govco_Ciudades_Comp =  json.govco_Ciudades_Comp;
            this.invcoPersonaTelefono = json.invcoPersonaTelefono;
            this.invcoPersonaEMail = json.invcoPersonaEMail;
            this.invcoAreaId = json.invcoAreaId;
            this.invcoPersonaEstado = json.invcoPersonaEstado;
        }
    }
}
