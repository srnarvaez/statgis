import ee

def rename(image ,native_name, new_name):
    """
    Function for reanmane bands to image products.

    Parameters
    ----------
    image  : ee.Image
        The scene seleted for make rename.

    native_name : array
        Select the interest bands in string format.

    new_name: arrat
        instert the new bands names in string format.


    Return
    ------
    list_data : list
        output the area and heigth normalized.
    """
    img=image.select(native_name)
    img=img.rename(new_name)
    
    return img