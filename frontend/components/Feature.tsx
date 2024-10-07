export const Feature = ({title, subtitle}: {
    title: string,
    subtitle: string
}) => {
    return <div className="flex pl-8 p-10">
        <div className="flex flex-col justify-center items-center pl-2">
                <div className="font-semibold cursor-pointer hover:shadow-md bg-black text-white rounded-full text-center flex justify-center max-w-fit p-3 lex-col">
                    {title}
                </div>
                <div className="pt-8 text-lg">
                    {subtitle}
                </div>
        </div>
    </div>
}