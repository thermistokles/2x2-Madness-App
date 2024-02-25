import Model from "../model/Model";

export default function reset(config) {
    let newModel = new Model()
    
    newModel.setConfig(config)
    return newModel
}
