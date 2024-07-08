const ConectarBD=require("./conectarBD");
class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuarios values(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
            await this.conectarMySql();
            const usuariosMySql=await this.conexion.execute(sql);
            console.log("Crea un nuevo usuario");
            await this.cerrarConexion();
            return usuariosMySql;
        } catch (error) {
            console.error("ERROR AL AGREGAR USUARIO"+error);
           console.error(sql);
        }
    }
    
    async mostrarUsuarios() {
        const sql="SELECT * FROM usuarios;";
        try {
            await this.conectarMySql();
         const [usuarioMySql]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return(usuarioMySql);
        } catch (error) {
            console.error("Error al obtener los datos de los usuarios"+error);
            console.error(sql);
        }
    }
    
    async usuarioID(id){
        const sql="SELECT * FROM usuarios WHERE idusuarios="+id+";";
        try {
            await this.conectarMySql();
            const [[usuario]]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return usuario;
        } catch (error) {
            console.error("Error al consultar por id"+error);
            console.error(sql);
        }
    }
    async editarUsuario(usuarioo){
        const sql="UPDATE usuarios SET nombre='"+usuarioo.nombre+"', celular='"+usuarioo.celular+"', correo='"+usuarioo.correo+"' where idusuarios= '"+usuarioo.id+"':";
        const sql1=`UPDATE usuarios SET 
        nombre='${usuarioo.nombre}',
        celular='${usuarioo.celular}',
        correo='${usuarioo.correo}'
        WHERE idusuarios =${usuarioo.id};`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql1);
            await this.cerrarConexion();
            console.log("Actuzalizacion correcta de usuario");
        } catch (error) {
            console.error("Error al editar usuario" + error);
            console.error(sql1);
        }
    }
    async borrarUsuario(id){
        const sql="DELETE FROM usuarios WHERE idusuarios= "+id+";";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario borrado")
        } catch (error) {
            console.error("Error al borrar el usuario"+error);
            console.log(sql);
        }
    }
}

module.exports=UsuarioBD;