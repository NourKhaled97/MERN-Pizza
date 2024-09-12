
export default function Success(props: { message: string }) {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                {props.message}
            </div>
        </div>
    )
}
