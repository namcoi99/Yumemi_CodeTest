const randDarkColor = () => {
    const lum = -0.25
    let hex = String(
        `#${Math.random().toString(16).slice(2, 8).toUpperCase()}`
    ).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    let rgb = '#'
    let c
    let i
    for (i = 0; i < 3; i += 1) {
        c = parseInt(hex.substr(i * 2, 2), 16)
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
        rgb += `00${c}`.substr(c.length)
    }
    return rgb
}
export default randDarkColor
