import axios from "axios";

export async function getQuestions(){
    const url="https://opentdb.com/api.php?amount=15"
    const {data}= await axios(url)
    return data
}