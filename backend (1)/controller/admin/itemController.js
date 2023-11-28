const itemModel = require("../../models/admin/itemSchema");

const addItem = async (req, res) => {
    try {
        let itemImg = req?.file?.filename;
        const { name, cuisine, type, price, description } = req.body;
        const userId = req.user._id;
        console.log(req._user, "userId")
        let newItem = new itemModel({
            userId,
            name,
            itemImg,
            cuisine,
            type,
            price,
            description
        });
        await newItem.save();
        return res.status(200).json({
            success: true,
            message: "item added successfully",
            data: newItem,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: {},
            success: false,
        });
    }
};

// const getAllItem = async (req, res) => {
//     try {
//         const response = await itemModel.find();
//         if (!response) {
//             return res.status(200).json({
//                 message: "Data not found",
//                 status: 404,
//             });
//         } else {
//             return res.status(200).json({
//                 message: "Data get successfully",
//                 data: response,
//                 totalCount: response.length,
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

const getSingleItem = async (req, res) => {
    try {
        let { id } = req.params;

        const response = await itemModel.findById(id);
        if (!response) {
            return res.status(200).json({
                message: "Data not found",
                status: 404,
            });
        } else {
            return res.status(200).json({
                message: "Data get successfully",
                data: response,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
const editItem = async (req, res, next) => {
    const { name, price, description, type, itemImg, cuisine } =
        req.body;

    //   return  console.log(req.body,"uiuiuiu")
    try {
        const Id = req.params.id;

        if (req.file) {
            const data = {
                name,
                price,
                description,
                type,
                cuisine

            };

            let itemimg = req?.file?.filename;
            data.itemImg = itemimg;

            let result = await itemModel.findByIdAndUpdate(Id, data);
            return res.status(200).json({
                status: 200,
                success: true,
                data: result,
                message: "Updated successfully",
            });
        } else {
            const obj = {
                name,
                price,
                itemImg,
                description,
                type,
                cuisine
            };
            let result = await itemModel.findByIdAndUpdate(Id, obj);
            return res.status(200).json({
                status: 200,
                success: true,
                data: result,
                message: "Updated successfully",
            });
        }
    } catch (error) {
        console.log(error);
    }
};
const deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
      const response = await itemModel.findByIdAndDelete({ _id: id });
      if (response) {
        return res.status(200).json({
          success: true,
          message: "Deleted Successfully",
          data: response,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "No Theme Found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  };

module.exports = {
    addItem,
    // getAllItem,
    getSingleItem,
    editItem,
    deleteItem
};