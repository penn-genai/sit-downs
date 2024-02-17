import { Clock } from "feather-icons-react"

export interface SummaryCardProps {
  person: string
  text: string
  date: string
  action: string
  links: [string, string][]
}

const SummaryCard = ({
  text,
  person,
  date,
  action,
  links
}: SummaryCardProps) => {
  return (
    <div className="p-6 bg-background-light rounded-[2rem] my-2 space-y-2">
      <div className="flex items-center">
        <h2 className="text-xl text-left font-bold">{person}</h2>
        <span className="text-xl">&nbsp;{action}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock size={16} className="text-primary" />
        <span className="text-base text-left text-primary">{date}</span>
      </div>
      <p className="text-base text-[#B4B4B4]">{text}</p>
      <div>
        {links.map((link, index) => (
          <a
            key={index}
            href={link[1]}
            className="text-blue-500 hover:text-blue-600 mr-2">
            {link[0].split(".")[0]}
          </a>
        ))}
      </div>
    </div>
  )
}
export default SummaryCard
