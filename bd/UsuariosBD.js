const ConectarBD=require("./conectarBD");
class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuarios values(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
            await this.conectarMySql();
           await this.conexion.execute(sql);
        console.log("Crea un nuevo usuario");
        await this.cerrarConexion();
        } catch (error) {
            console.error("ERROR AL AGREGAR USUARIO"+error);
           console.error(sql);
        }
    }
    
    async mostrarUsuarios() {
        const sql="SELECT * FROM usuarios;";
        try {
            await this.conectarMySql();
         const [usuariosMySql]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return(usuariosMySql);
        } catch (error) {
            console.error("Error al obtener los datos de los usuarios"+error);
            console.error(sql);
        }
    }
    
    async usuarioId(id){
        const sql="SELECT * FROM usuarios WHERE idusuario="+id+";";
        try {
            await this.conectarMySql();
            const [[usuaio]]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return usuaio;
        } catch (error) {
            console.error("Error al consultar por id"+error);
            console.error(sql);
        }
    }
    async editarUsuario(usuario){
        const sql="UPDATE usuarios SET nombre='"+usuario.nombre+"', celular='"+usuario.celular+"', correo='"+usuario.correo+"';";
        const sql2=`UPDATE usuarios SET 
        nombre='${usuario.nombre}',
        celular='${usuario.celular}',
        correo='${usuario.correo}'
        WHERE idusuario=${usuario.idusuario};`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
            console.log("Actuzalizacion correcta de usuario");
        } catch (error) {
            console.error("Error al editar usuario" + error);
            console.error(sql2);
        }
    }
    async borrarUsuario(idusuario){
        const sql="DELETE FROM usuarios WHERE idusuario="+idusuario;
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