using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    //สถานะการชำระเงิน
    public enum OrderStatus //enum ชนิดข้อมูลอย่างหนึ่งที่เป็นตัวเลข
    {
        Pending,
        PaymentReceived,
        PaymentFailed
    }
}