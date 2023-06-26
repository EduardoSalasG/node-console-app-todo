require('colors')

const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar, 
    confirmar,
    mostrarListadoCheckList} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const { guardarDB, leerDB } = require('./db/guardarArchivo')

const main = async () => {

    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }
    
    do {
        // Imprime el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            
            case '3': // listar completadas
                tareas.listarPendientesCompletadas( true );
                break;
            
            case '4': // listar pendientes
                tareas.listarPendientesCompletadas( false);
                break;

            case '5': // completar tareas
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            
            case '6': // borrar tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0'){
                    const ok = await confirmar("¿Está seguro?");
                    // TODO: preguntar si está seguro
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
                break;       
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    }
    while (opt !== '0');

    // pausa();

}

main();