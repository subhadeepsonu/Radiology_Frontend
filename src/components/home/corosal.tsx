import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  export default function CarouselHome() {
    return (
      <div className="h-screen flex justify-center items-center flex-col">
        
      <Carousel
        opts={{
          
          loop:true
        }}
        className=" flex w-3/4  justify-center items-center "
      >
        <CarouselContent className=" ">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
              <div className=" flex justify-center items-center">
                
                    <div className="bg-purple-500/25  flex justify-center items-center backdrop-blur-sm h-96 w-72">{index+1}</div>
                  
                
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      </div>
    )
  }
    