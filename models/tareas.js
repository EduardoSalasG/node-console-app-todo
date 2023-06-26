
const Tarea = require('./tarea')

/*
* _listado:
    {'uuid-123712-123123-2': { id:12, desc: 'asd', completadaEn: null}}
*/


class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[ key ];
            listado.push( tarea );
        })



        return listado;

    }



    constructor() {
        this._listado = {};
    }

    borrarTarea ( id = '') {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }


    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, i)  => {
                const idx = `${i + 1}.`.green;
                const { desc, completadoEn } = tarea;
                const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;
                
                console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas ( completadas = true ){
        let contador = 0;
        console.log();
        this.listadoArr.forEach( (tarea)  => {
                const { desc, completadoEn } = tarea;
                const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;
                if ( completadas ) {
                    if( completadoEn ) {
                        contador += 1;
                        console.log(`${contador.toString().green + '.'.green} ${desc} :: ${completadoEn.green}`);
                    }
                }else {
                    if( !completadoEn ) {
                        contador += 1;
                        console.log(`${contador.toString().green + '.'.green} ${desc} :: ${estado}`);
                    }
                }
                
        })
    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });



    }


}

module.exports = Tareas;