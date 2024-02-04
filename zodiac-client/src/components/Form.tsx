
interface IForm {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
}

export const Form = ({ handleSubmit, isLoading }: IForm) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="form" disabled={isLoading} placeholder="Example: A snake eating the end of its tale with a lotus in the Cybersigilism Tattoo Style" />
            <button disabled={isLoading}>Build</button>
        </form>
    )
}