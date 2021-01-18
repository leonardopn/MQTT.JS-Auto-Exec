import axios from "axios";
import types from "./types"
import DivFlex from "../../components/divFlex/DivFlex"
import Command from "../../components/command/Command"
import cat_empty_folder from "../../img/cat_empty_folder.gif";

function getCommandsFromAPI() {
    const arrayTemp = [];
    return new Promise((resolve, _) => {
        axios.get("http://localhost:8888/getCommands").then(response => {
            response.data.forEach(command => {
                arrayTemp.push(<Command isNew={false} key={command.id} id={command.id} name={command.name} command={command.command} folder={command.path}></Command>)
            })

            if (arrayTemp.length < 1) {
                arrayTemp.push(
                    <DivFlex key="cat_empty_commands">
                        <img style={{ width: "450px" }} src={cat_empty_folder} alt="cat_folder_empty_gif"/>
                        <h2>Sem comandos por aqui... <img style={{ width: "25px" }} src="https://emojitool.com/img/twitter/twemoji-13.0.1/crying-cat-112.png" alt="cat_folder_empty_gif"></img></h2>
                    </DivFlex>
                )
            }
            resolve(arrayTemp);
        }).catch(error => {
            arrayTemp.length = 0;
            arrayTemp.push(
                <DivFlex key="cat_empty_commands">
                    <img style={{ width: "450px" }} src={cat_empty_folder} alt="cat_folder_empty_gif"/>
                    <div>
                        <h2>Algum erro ocorreu... <img style={{ width: "25px" }} src="https://emojitool.com/img/twitter/twemoji-13.0.1/crying-cat-112.png" alt="cat_folder_empty_gif"></img></h2>
                        <p>Erro: {error.message}</p>
                    </div>
                </DivFlex>
            )
            resolve(arrayTemp);
        })
    })
}

export function getCommands() {
    return {
        type: types.GET_COMMANDS,
        payload: getCommandsFromAPI()
    }
}