export default function FormControl({ onChange, label, type="text", value }){
    return (
        <div className="form-group">
            <label>{label}</label>
            <input 
                placeholder={label} 
                value={value || ''}
                type={type} 
                onChange={
                    type === "file"? e => onChange(e.target.files[0]) :
                    e => onChange(e.target.value)} 
                className="form-control" 
            />
        </div>
    )

} 

export function TextAreaFormControl({ onChange, label, value }){
    return (
        <div className="form-group">
            <label>{label}</label>
            <textarea
                rows="6"
                placeholder={label} 
                value={value || ''}
                onChange={e => onChange(e.target.value)} 
                className="form-control" 
                style={{resize: 'none'}}
            ></textarea>
        </div>
    )

} 