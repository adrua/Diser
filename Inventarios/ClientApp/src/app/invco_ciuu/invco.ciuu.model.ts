export class INVCO_CiuuModel {
    public compania: number = 1;
    public invcoCiuuCodigoCiiu: number;
    public invcoCiuuAgrupacion: number;
    public invcoCiuuCiudad: number;
    public invcoCiuuSectorEconomico: number;
    public invcoCiuuNombreHomologaCarteraCcial: string;
    public invcoCiuuHomologaDeceval: number;
    public codHomologaCarteraCcial: number;
    public invcoCiuuHomologaRedeban: number;
    public invcoCiuuHomologacionSecDeceval: number;
    public invcoCiuuCodigoAct: number;
    public invcoCiuuNombreAct: string;
    public invcoCiuuActivo: boolean;
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;
    public relaciones: any;

    constructor(json: any = null) {
        this.relaciones = {};
        if (json !== null) {
            this.invcoCiuuCodigoCiiu = json.codigoCiiu;
            this.invcoCiuuAgrupacion = json.agrupacion;
            this.invcoCiuuCiudad = json.ciudad;
            this.invcoCiuuSectorEconomico = json.sectorEconomico;
            this.invcoCiuuNombreHomologaCarteraCcial = json.nombreHomologaCarteraCcial;
            this.invcoCiuuHomologaDeceval = json.homologaDeceval;
            this.codHomologaCarteraCcial = json.codHomologaCarteraCcial;
            this.invcoCiuuHomologaRedeban = json.homologaRedeban;
            this.invcoCiuuHomologacionSecDeceval = json.homologacionSecDeceval;
            this.invcoCiuuCodigoAct = json.codigoAct;
            this.invcoCiuuNombreAct = json.nombreAct;
            this.invcoCiuuActivo = json.activo;
            this.estado = 'U';
        }
    }

    static clone(row: INVCO_CiuuModel): any {
        let json: any = {};
        json.codigoCiiu = row.invcoCiuuCodigoCiiu;
        json.agrupacion = row.invcoCiuuAgrupacion;
        json.ciudad = row.invcoCiuuCiudad;
        json.sectorEconomico = row.invcoCiuuSectorEconomico;
        json.nombreHomologaCarteraCcial = row.invcoCiuuNombreHomologaCarteraCcial;
        json.homologaDeceval = row.invcoCiuuHomologaDeceval;
        json.codHomologaCarteraCcial = row.codHomologaCarteraCcial;
        json.homologaRedeban = row.invcoCiuuHomologaRedeban;
        json.homologacionSecDeceval = row.invcoCiuuHomologacionSecDeceval;
        json.codigoAct = row.invcoCiuuCodigoAct;
        json.nombreAct = row.invcoCiuuNombreAct;
        json.activo = row.invcoCiuuActivo;
        return json;    
    }
}
