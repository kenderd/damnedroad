import {disconnect} from "@wagmi/core"
import { config } from "../wagmiConfig"
export default async function disconnectNow(){

await disconnect(config)

}