import { Result, Image } from "../interface"

interface ICard {
    res: Image
}

export const Card = ({ res }: ICard) => {
    return (
        <div>
            <img src={res.image} alt={'tattoo design'} loading="lazy" />
            <div className="hidden">
                <h4>{res.description}</h4>
            </div>
        </div>
    )
}