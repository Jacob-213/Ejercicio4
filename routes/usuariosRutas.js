const ruta=require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD=require("../bd/UsuariosBD");

ruta.get("/",async (req,res)=>{
     //var usuario1=new UsuarioClase();
     const usuariobd=new UsuarioBD();
     const usuariosMySql=await usuariobd.mostrarUsuarios();
     var usuariosCorrectos = [];
     usuariosMySql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);

        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario);
        }
    });
     console.log(usuariosCorrectos);
     res.render("mostrarUsuarios", {usuariosCorrectos});
});

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new UsuarioClase(req.body);
    console.log(usuario1.mostrarDatos);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
       usuariobd.nuevoUsuario(usuario1.mostrarDatos);
       console.log(usuario1.mostrarDatos);
        //res.render("inicio",usuario1.mostrarDatos);
    }else{
        res.render("error");
    }
    
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:id_usuarios",async(req,res)=>{
    try {
        const usuariobd=new UsuarioBD();
        const usuario=await usuariobd.usuarioID(req.params.id_usuarios);
        res.render("editarUsuario", usuario);
    } catch (error) {
        console.log("Error al modificar el usuario"+error);
    }
    //res.end();
})

ruta.post("/editarUsuario", async(req,res)=>{
   try {
    const usuariobd= new UsuarioBD();
    console.log(req.body);
    await usuariobd.editarUsuario(req.body);
    console.log("Usuario editado correctamente");
    res.redirect("/");
   } catch (error) {
    console.error("Error al editar el usuario");
   } 
})

ruta.get("/borrarUsuario/:id_usuarios",async(req,res)=>{
try {
    const usuariobd= new UsuarioBD();
    await usuariobd.borrarUsuario(req.params.id_usuarios);
    res.redirect("/");
} catch (error) {
    console.error(error);
}
})

module.exports=ruta;