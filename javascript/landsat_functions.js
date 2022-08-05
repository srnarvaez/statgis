/**
 * Scale image to Surface Reflectance values.
 * @function landsat_scaler
 * @param   {ee.Image} Image from Landsat Collection.
 * @return  {ee.Image} Image scaled.
 */

/**
 * Mask pixel clouds classifed in QA_PIXEL BAND for Image from Landsat Collection.
 * @function landsat_cloud_mask
 * @param   {ee.Image}  Image   Image to be masked.
 * @param   {boolean}   all     If True, compute a mask for all classification values. If False, compute a mask only for cloud values.
 * @return  {ee.Image}  Image   Masked image.
 */

exports.landsat_scaler = function(Image) {
    var optical = Image.select("SR_B.").multiply(0.0000275).add(-0.2);
    var thermal = Image.select("ST_B.*").multiply(0.00341802).add(149);

    Image = Image.addBands(optical, null, true)
                 .addBands(thermal, null, true);

    return Image;
}

exports.landsat_cloud_mask = function(Image) {
    var qa = Image.select("QA_PIXEL");

    var cirrus = qa.bitwiseAnd((1 << 2)).eq(0);
    var cloud = qa.bitwiseAnd((1 << 3)).eq(0);
    var shadow = qa.bitwiseAnd((1 << 4)).eq(0);
    var snow = qa.bitwiseAnd((1 << 5)).eq(0);

    Image = Image.updateMask(cirrus)
                 .updateMask(cloud)
                 .updateMask(shadow)
                 .updateMask(snow);

    return Image;
}