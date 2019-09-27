export class TECBOG_RolesModel {
    public compania: number = 1;
    public tecbogRolesaplicacionCodigo: number = 0.0;
    public tecbogRolesCodigoRol: number = 0.0;
    public tecboG_Roles_Comp: string;
    public tecbogRolesRolNombre: string;
    public tecbogRolesRolEstado: boolean;
    public secuencia: number;
    public estado: string = 'N';
    public _id: string;
    public _v: number;
    public relaciones: any;

    constructor(json: any = null) {
        this.relaciones = {};
        if (json !== null) {
            this.tecbogRolesaplicacionCodigo = json.aplicacionCodigo;
            this.tecbogRolesCodigoRol = json.codigoRol;
            this.tecboG_Roles_Comp =  json.tecboG_Roles_Comp;
            this.tecbogRolesRolNombre = json.rolNombre;
            this.tecbogRolesRolEstado = json.rolEstado;
        }
    }
}
