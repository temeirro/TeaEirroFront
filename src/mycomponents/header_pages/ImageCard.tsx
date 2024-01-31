const ImageCard = ({ children, imgSrc, ...props }) => {
    return (
        <div {...props} className="relative max-w-xs h-auto overflow-hidden rounded-2xl shadow-lg group">
            <img src={imgSrc} className="transition-transform group-hover:scale-110 duration-400 w-full h-full object-cover" alt="Card Image" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-4 w-full text-white">{children}</div>
            </div>
        </div>
    )
}
export default ImageCard;