import dummyData from './DummyData.json'

const data = dummyData
export const recvBooks = async (startIdx: number, recvRange: number) => {
    const promise = await new Promise(resolve => {
        setTimeout(function (){
            resolve(data.slice(startIdx, recvRange))
        }, 2000)
    })

    return promise
}
