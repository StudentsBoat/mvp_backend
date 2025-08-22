import { Router } from "express";
import usersRoutes from "./user/user";
// import other route files as needed
// import propertyRoutes from "./property/property";
// import addressRoutes from "./property/address";
// import mediaRoutes from "./property/media";
// import amenityRoutes from "./property/amenity";

const router = Router();

router.use("/user", usersRoutes);
// router.use("/properties", propertyRoutes);
// router.use("/properties/:propertyId/address", addressRoutes);
// router.use("/properties/:propertyId/media", mediaRoutes);
// router.use("/properties/:propertyId/amenities", amenityRoutes);

export default router;