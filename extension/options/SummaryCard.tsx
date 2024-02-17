import FeatherIcon from "feather-icons-react"

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
    <div
      className={`p-6 rounded-[2rem] my-4 space-y-2 bg-background-light ${person == "You" ? "border-2 border-primary" : ""}`}>
      <div>
        <span className="text-xl text-left font-bold">{person}</span>
        <span className="text-xl">&nbsp;{action}</span>
      </div>
      <div className="flex items-center space-x-2">
        <FeatherIcon icon="clock" size={16} className="text-primary" />
        <span className="text-base text-left text-primary">{date}</span>
      </div>
      <p className="text-base text-[#B4B4B4]">{text}</p>
      <div>
        {links.map((link, index) => (
          <a
            key={index}
            href={link[1]}
            className="text-primary hover:text-blue-600 mr-4">
            {link[0].split(".")[0]}
          </a>
        ))}
      </div>
    </div>
  )
}
export default SummaryCard
