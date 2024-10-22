// we send response to the user via controller & this response show on the browser
export const test = (req, res) => {
    res.json({
        message: "Api route is working",
    })
};