
export default function Error(props: { error: string }) {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                {props.error}
            </div>
        </div>
    )
}
