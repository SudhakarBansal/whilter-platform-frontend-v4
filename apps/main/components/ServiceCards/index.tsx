import { services } from "@/utils/data/services";
import { Box } from "@mui/material";
import { ServiceCard } from "./ServiceCard";

export const ServiceCards = () => {
    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 w-full my-20">
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    title={service.title}
                    image={service.image}
                />
            ))}
        </Box>
    );
}