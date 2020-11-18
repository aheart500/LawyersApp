import { DataTypes, ModelDefined, Optional } from 'sequelize'
import DB from './MySQL'

export interface Lawyer {
    name: string
    slug: string
    Clients: [Client]
    id: number
}

export interface Image {
    ClientId: number
    path: string
    id: number
}
export interface Client {
    name: string
    date: string
    verdict: string
    code: number
    id: number
    fees: number
    forward_payment: number
    Images: Array<Image>
    LawyerId: number
    Lawyer: Lawyer
}
export type LawyerM = ModelDefined<Lawyer, Optional<Lawyer, 'id'>>
export type ImageM = ModelDefined<Image, Optional<Image, 'id'>>
export type ClientM = ModelDefined<Client, Optional<Client, 'id'>>


const LawyerModel: LawyerM = DB.define('Lawyer',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    slug: DataTypes.TEXT({length: 'long'}),
    name: DataTypes.STRING
})

const ImageModel: ImageM = DB.define('Image', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    path: DataTypes.TEXT({length: 'long'}),
})
const ClientModel: ClientM = DB.define('Client', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    code: DataTypes.STRING,
    date: DataTypes.STRING,
    fees: DataTypes.FLOAT,
    forward_payment: DataTypes.FLOAT,
    name: DataTypes.STRING,
    verdict: DataTypes.TEXT({length: 'long'})
})

LawyerModel.hasMany(ClientModel)
ClientModel.hasMany(ImageModel)
ClientModel.belongsTo(LawyerModel)

export interface Models {
    Lawyer: LawyerM,
    Client: ClientM,
    Image: ImageM,

}
export {ClientModel, LawyerModel,ImageModel}