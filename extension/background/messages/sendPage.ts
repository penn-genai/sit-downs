import type { PlasmoMessaging } from "@plasmohq/messaging"
import axios from "axios"
 
const handleSendPage: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await axios.post("http://localhost:8000/page/1d8f34c3-b913-42ba-b3e8-b372df6784e4", req.body)
 
  res.send({
    message
  })
}
 
export default handleSendPage
