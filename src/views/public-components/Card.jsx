export function HorizontalCard({ title, image, content, onClick }) {
    return ( 
        <div className="card m-2" style={{minWidth: 200, height: 240, maxWidth: 450, cursor: 'pointer'}} onClick={onClick}>
            <div className="row g-0 h-100">
                {image?
                    // <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img src={image} style={{objectFit: 'cover'}} className="col-md-5 h-100 img-fluid rounded-start" />
                    //</div> 
                : null
                }
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text" style={{overflow: 'hidden', maxHeight: 150}}>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function VerticalCard({ title, image, content, onClick  }){
    return (
        <div 
            className="card m-3" 
            onClick={onClick} 
            style={{minWidth:200,width: 300, height: 350, overflow: 'hidden', cursor: 'pointer'}}
        >
            {image? <img src={image} className="card-img-top" alt={title} style={{maxHeight: '200px', objectFit: 'cover'}}/>
            : ''
            }
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    )
}