const { item } = require("../../models");

exports.getAllItem = async (req, res) => {
  try {
    let data = await item.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt',],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((data) => {
      return {
        ...data,
        image: process.env.FILE_PATH + data.image,
      };
    });

    res.send({
      status: 'success',
      data: {
        items: data
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getIditem = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await item.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      image: data.image
    };

    res.send({
      status: 'success',
      data: {
        item: data
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};


exports.additem = async (req, res) => {
  try {
    const { ...data } = req.body;
    const items = await item.create({
      ...data,
      image: req.files.image[0].filename
    });

    let iditem = await item.findOne({
      where: {
        id: items.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    iditem = JSON.parse(JSON.stringify(iditem));
    iditem = {
      ...iditem,
      image: process.env.FILE_PATH + iditem.image
    };

    res.send({
      status: 'success',
      message: 'Add item finished',
      data: {
        item: iditem
      },
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.updateitem = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    if (req.files && req.files.image) {
      data = {
        ...data,
        image: req.files.image[0].filename
      };
    }

    await item.update(data, {
      where: {
        id
      }
    });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      image: data.image ? process.env.FILE_PATH + data.image : "" // Menyertakan URL gambar jika ada, jika tidak kosongkan
    };

    res.send({
      status: 'success',
      message: `Update item id: ${id} finished`,
      data: {
        item: data
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error'
    });
  }
};


exports.deleteitem = async (req, res) => {
  try {
    const { id } = req.params

    await item.destroy({
      where: {
        id
      }
    })

    res.send({
      status: 'success',
      message: `Delete item id: ${id} finished`
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}