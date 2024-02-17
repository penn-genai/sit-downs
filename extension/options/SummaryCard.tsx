export interface SummaryCardProps {
    person: string
    text: string
}

const SummaryCard = ({text, person}: SummaryCardProps) => {
    return <div className="border border-zinc-200 rounded-lg flex flex-col p-4 basis-4/12">
        <h2 className="text-xl text-center">{person}</h2>
        <p>{text}</p>
    </div>
}
export default SummaryCard
