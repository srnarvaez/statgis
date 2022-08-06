/**
 * Scale the optical bands from Sentinel 2 image.
 * @function sentinel_scaler
 * @param   {ee.Image}  Image   Image to be scaled.
 * @return  {ee.Image}  Image   Scaled image.
 */

/**
 * Mask clouds for Sentinel 2 images using QA60
 * @function sentinel_cloud_mask
 * @param   {ee.Image}  Image   Image to be masked.
 * @return  {ee.Image}  Image   Masked image.
 */

 var sentinel_scaler = function(Image) {
    var bands = Image.select("B.*").divide(10000);
    Image = Image.addBands(bands, null, true);

    return Image;
};

var sentinel_cloud_mask = function(Image) {
    var qa = Image.select("QA60");

    var cloud_mask = qa.bitwiseAnd((1 << 10)).eq(0);
    var cirrus_mask = qa.bitwiseAnd((1 << 11)).eq(0);

    Image = Image.updateMask(cloud_mask).updateMask(cirrus_mask);

    return Image;
};

exports.sentinel_scaler = sentinel_scaler;
exports.sentinel_cloud_mask = sentinel_cloud_mask;