const apiValidator = schema => {
    return (req, res, next) => {
        try {
            const input = req.body;
            const result = schema.validate(input, { abortEarly: false });
            
            if(result.error){
                const errors = result.error?.details.map(({message, context}) => ({
                    message,
                    input: context
                }));
                
                return res.status(400).json({
                    status: 'success',
                    message: 'Error',
                    errors
                });
            }
            
            next();
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                message: 'Ha ocurrido un error al procesar la solicitud'
            });
        }
    }
}

module.exports = apiValidator;