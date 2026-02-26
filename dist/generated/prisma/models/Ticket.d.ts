import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TicketModel = runtime.Types.Result.DefaultSelection<Prisma.$TicketPayload>;
export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null;
    _avg: TicketAvgAggregateOutputType | null;
    _sum: TicketSumAggregateOutputType | null;
    _min: TicketMinAggregateOutputType | null;
    _max: TicketMaxAggregateOutputType | null;
};
export type TicketAvgAggregateOutputType = {
    onChainTicketId: number | null;
    numbers: number | null;
};
export type TicketSumAggregateOutputType = {
    onChainTicketId: number | null;
    numbers: number[];
};
export type TicketMinAggregateOutputType = {
    id: string | null;
    onChainTicketId: number | null;
    isWinner: boolean | null;
    drawId: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TicketMaxAggregateOutputType = {
    id: string | null;
    onChainTicketId: number | null;
    isWinner: boolean | null;
    drawId: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TicketCountAggregateOutputType = {
    id: number;
    onChainTicketId: number;
    numbers: number;
    isWinner: number;
    drawId: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TicketAvgAggregateInputType = {
    onChainTicketId?: true;
    numbers?: true;
};
export type TicketSumAggregateInputType = {
    onChainTicketId?: true;
    numbers?: true;
};
export type TicketMinAggregateInputType = {
    id?: true;
    onChainTicketId?: true;
    isWinner?: true;
    drawId?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TicketMaxAggregateInputType = {
    id?: true;
    onChainTicketId?: true;
    isWinner?: true;
    drawId?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TicketCountAggregateInputType = {
    id?: true;
    onChainTicketId?: true;
    numbers?: true;
    isWinner?: true;
    drawId?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TicketAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput | Prisma.TicketOrderByWithRelationInput[];
    cursor?: Prisma.TicketWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TicketCountAggregateInputType;
    _avg?: TicketAvgAggregateInputType;
    _sum?: TicketSumAggregateInputType;
    _min?: TicketMinAggregateInputType;
    _max?: TicketMaxAggregateInputType;
};
export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
    [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTicket[P]> : Prisma.GetScalarType<T[P], AggregateTicket[P]>;
};
export type TicketGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithAggregationInput | Prisma.TicketOrderByWithAggregationInput[];
    by: Prisma.TicketScalarFieldEnum[] | Prisma.TicketScalarFieldEnum;
    having?: Prisma.TicketScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TicketCountAggregateInputType | true;
    _avg?: TicketAvgAggregateInputType;
    _sum?: TicketSumAggregateInputType;
    _min?: TicketMinAggregateInputType;
    _max?: TicketMaxAggregateInputType;
};
export type TicketGroupByOutputType = {
    id: string;
    onChainTicketId: number;
    numbers: number[];
    isWinner: boolean;
    drawId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: TicketCountAggregateOutputType | null;
    _avg: TicketAvgAggregateOutputType | null;
    _sum: TicketSumAggregateOutputType | null;
    _min: TicketMinAggregateOutputType | null;
    _max: TicketMaxAggregateOutputType | null;
};
type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TicketGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TicketGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TicketGroupByOutputType[P]>;
}>>;
export type TicketWhereInput = {
    AND?: Prisma.TicketWhereInput | Prisma.TicketWhereInput[];
    OR?: Prisma.TicketWhereInput[];
    NOT?: Prisma.TicketWhereInput | Prisma.TicketWhereInput[];
    id?: Prisma.UuidFilter<"Ticket"> | string;
    onChainTicketId?: Prisma.IntFilter<"Ticket"> | number;
    numbers?: Prisma.IntNullableListFilter<"Ticket">;
    isWinner?: Prisma.BoolFilter<"Ticket"> | boolean;
    drawId?: Prisma.UuidFilter<"Ticket"> | string;
    userId?: Prisma.UuidFilter<"Ticket"> | string;
    createdAt?: Prisma.DateTimeFilter<"Ticket"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Ticket"> | Date | string;
    draw?: Prisma.XOR<Prisma.DrawScalarRelationFilter, Prisma.DrawWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TicketOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    onChainTicketId?: Prisma.SortOrder;
    numbers?: Prisma.SortOrder;
    isWinner?: Prisma.SortOrder;
    drawId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    draw?: Prisma.DrawOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    onChainTicketId?: number;
    AND?: Prisma.TicketWhereInput | Prisma.TicketWhereInput[];
    OR?: Prisma.TicketWhereInput[];
    NOT?: Prisma.TicketWhereInput | Prisma.TicketWhereInput[];
    numbers?: Prisma.IntNullableListFilter<"Ticket">;
    isWinner?: Prisma.BoolFilter<"Ticket"> | boolean;
    drawId?: Prisma.UuidFilter<"Ticket"> | string;
    userId?: Prisma.UuidFilter<"Ticket"> | string;
    createdAt?: Prisma.DateTimeFilter<"Ticket"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Ticket"> | Date | string;
    draw?: Prisma.XOR<Prisma.DrawScalarRelationFilter, Prisma.DrawWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "onChainTicketId">;
export type TicketOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    onChainTicketId?: Prisma.SortOrder;
    numbers?: Prisma.SortOrder;
    isWinner?: Prisma.SortOrder;
    drawId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TicketCountOrderByAggregateInput;
    _avg?: Prisma.TicketAvgOrderByAggregateInput;
    _max?: Prisma.TicketMaxOrderByAggregateInput;
    _min?: Prisma.TicketMinOrderByAggregateInput;
    _sum?: Prisma.TicketSumOrderByAggregateInput;
};
export type TicketScalarWhereWithAggregatesInput = {
    AND?: Prisma.TicketScalarWhereWithAggregatesInput | Prisma.TicketScalarWhereWithAggregatesInput[];
    OR?: Prisma.TicketScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TicketScalarWhereWithAggregatesInput | Prisma.TicketScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Ticket"> | string;
    onChainTicketId?: Prisma.IntWithAggregatesFilter<"Ticket"> | number;
    numbers?: Prisma.IntNullableListFilter<"Ticket">;
    isWinner?: Prisma.BoolWithAggregatesFilter<"Ticket"> | boolean;
    drawId?: Prisma.UuidWithAggregatesFilter<"Ticket"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"Ticket"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Ticket"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Ticket"> | Date | string;
};
export type TicketCreateInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    draw: Prisma.DrawCreateNestedOneWithoutTicketsInput;
    user: Prisma.UserCreateNestedOneWithoutTicketsInput;
};
export type TicketUncheckedCreateInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    drawId: string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TicketUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    draw?: Prisma.DrawUpdateOneRequiredWithoutTicketsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutTicketsNestedInput;
};
export type TicketUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    drawId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketCreateManyInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    drawId: string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TicketUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    drawId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketListRelationFilter = {
    every?: Prisma.TicketWhereInput;
    some?: Prisma.TicketWhereInput;
    none?: Prisma.TicketWhereInput;
};
export type TicketOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TicketCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onChainTicketId?: Prisma.SortOrder;
    numbers?: Prisma.SortOrder;
    isWinner?: Prisma.SortOrder;
    drawId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TicketAvgOrderByAggregateInput = {
    onChainTicketId?: Prisma.SortOrder;
    numbers?: Prisma.SortOrder;
};
export type TicketMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onChainTicketId?: Prisma.SortOrder;
    isWinner?: Prisma.SortOrder;
    drawId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TicketMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onChainTicketId?: Prisma.SortOrder;
    isWinner?: Prisma.SortOrder;
    drawId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TicketSumOrderByAggregateInput = {
    onChainTicketId?: Prisma.SortOrder;
    numbers?: Prisma.SortOrder;
};
export type TicketCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutUserInput, Prisma.TicketUncheckedCreateWithoutUserInput> | Prisma.TicketCreateWithoutUserInput[] | Prisma.TicketUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutUserInput | Prisma.TicketCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TicketCreateManyUserInputEnvelope;
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
};
export type TicketUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutUserInput, Prisma.TicketUncheckedCreateWithoutUserInput> | Prisma.TicketCreateWithoutUserInput[] | Prisma.TicketUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutUserInput | Prisma.TicketCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.TicketCreateManyUserInputEnvelope;
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
};
export type TicketUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutUserInput, Prisma.TicketUncheckedCreateWithoutUserInput> | Prisma.TicketCreateWithoutUserInput[] | Prisma.TicketUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutUserInput | Prisma.TicketCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TicketUpsertWithWhereUniqueWithoutUserInput | Prisma.TicketUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TicketCreateManyUserInputEnvelope;
    set?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    disconnect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    delete?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    update?: Prisma.TicketUpdateWithWhereUniqueWithoutUserInput | Prisma.TicketUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TicketUpdateManyWithWhereWithoutUserInput | Prisma.TicketUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TicketScalarWhereInput | Prisma.TicketScalarWhereInput[];
};
export type TicketUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutUserInput, Prisma.TicketUncheckedCreateWithoutUserInput> | Prisma.TicketCreateWithoutUserInput[] | Prisma.TicketUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutUserInput | Prisma.TicketCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.TicketUpsertWithWhereUniqueWithoutUserInput | Prisma.TicketUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.TicketCreateManyUserInputEnvelope;
    set?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    disconnect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    delete?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    update?: Prisma.TicketUpdateWithWhereUniqueWithoutUserInput | Prisma.TicketUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.TicketUpdateManyWithWhereWithoutUserInput | Prisma.TicketUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.TicketScalarWhereInput | Prisma.TicketScalarWhereInput[];
};
export type TicketCreateNestedManyWithoutDrawInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutDrawInput, Prisma.TicketUncheckedCreateWithoutDrawInput> | Prisma.TicketCreateWithoutDrawInput[] | Prisma.TicketUncheckedCreateWithoutDrawInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutDrawInput | Prisma.TicketCreateOrConnectWithoutDrawInput[];
    createMany?: Prisma.TicketCreateManyDrawInputEnvelope;
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
};
export type TicketUncheckedCreateNestedManyWithoutDrawInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutDrawInput, Prisma.TicketUncheckedCreateWithoutDrawInput> | Prisma.TicketCreateWithoutDrawInput[] | Prisma.TicketUncheckedCreateWithoutDrawInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutDrawInput | Prisma.TicketCreateOrConnectWithoutDrawInput[];
    createMany?: Prisma.TicketCreateManyDrawInputEnvelope;
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
};
export type TicketUpdateManyWithoutDrawNestedInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutDrawInput, Prisma.TicketUncheckedCreateWithoutDrawInput> | Prisma.TicketCreateWithoutDrawInput[] | Prisma.TicketUncheckedCreateWithoutDrawInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutDrawInput | Prisma.TicketCreateOrConnectWithoutDrawInput[];
    upsert?: Prisma.TicketUpsertWithWhereUniqueWithoutDrawInput | Prisma.TicketUpsertWithWhereUniqueWithoutDrawInput[];
    createMany?: Prisma.TicketCreateManyDrawInputEnvelope;
    set?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    disconnect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    delete?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    update?: Prisma.TicketUpdateWithWhereUniqueWithoutDrawInput | Prisma.TicketUpdateWithWhereUniqueWithoutDrawInput[];
    updateMany?: Prisma.TicketUpdateManyWithWhereWithoutDrawInput | Prisma.TicketUpdateManyWithWhereWithoutDrawInput[];
    deleteMany?: Prisma.TicketScalarWhereInput | Prisma.TicketScalarWhereInput[];
};
export type TicketUncheckedUpdateManyWithoutDrawNestedInput = {
    create?: Prisma.XOR<Prisma.TicketCreateWithoutDrawInput, Prisma.TicketUncheckedCreateWithoutDrawInput> | Prisma.TicketCreateWithoutDrawInput[] | Prisma.TicketUncheckedCreateWithoutDrawInput[];
    connectOrCreate?: Prisma.TicketCreateOrConnectWithoutDrawInput | Prisma.TicketCreateOrConnectWithoutDrawInput[];
    upsert?: Prisma.TicketUpsertWithWhereUniqueWithoutDrawInput | Prisma.TicketUpsertWithWhereUniqueWithoutDrawInput[];
    createMany?: Prisma.TicketCreateManyDrawInputEnvelope;
    set?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    disconnect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    delete?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    connect?: Prisma.TicketWhereUniqueInput | Prisma.TicketWhereUniqueInput[];
    update?: Prisma.TicketUpdateWithWhereUniqueWithoutDrawInput | Prisma.TicketUpdateWithWhereUniqueWithoutDrawInput[];
    updateMany?: Prisma.TicketUpdateManyWithWhereWithoutDrawInput | Prisma.TicketUpdateManyWithWhereWithoutDrawInput[];
    deleteMany?: Prisma.TicketScalarWhereInput | Prisma.TicketScalarWhereInput[];
};
export type TicketCreatenumbersInput = {
    set: number[];
};
export type TicketUpdatenumbersInput = {
    set?: number[];
    push?: number | number[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type TicketCreateWithoutUserInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    draw: Prisma.DrawCreateNestedOneWithoutTicketsInput;
};
export type TicketUncheckedCreateWithoutUserInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    drawId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TicketCreateOrConnectWithoutUserInput = {
    where: Prisma.TicketWhereUniqueInput;
    create: Prisma.XOR<Prisma.TicketCreateWithoutUserInput, Prisma.TicketUncheckedCreateWithoutUserInput>;
};
export type TicketCreateManyUserInputEnvelope = {
    data: Prisma.TicketCreateManyUserInput | Prisma.TicketCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type TicketUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.TicketWhereUniqueInput;
    update: Prisma.XOR<Prisma.TicketUpdateWithoutUserInput, Prisma.TicketUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TicketCreateWithoutUserInput, Prisma.TicketUncheckedCreateWithoutUserInput>;
};
export type TicketUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.TicketWhereUniqueInput;
    data: Prisma.XOR<Prisma.TicketUpdateWithoutUserInput, Prisma.TicketUncheckedUpdateWithoutUserInput>;
};
export type TicketUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.TicketScalarWhereInput;
    data: Prisma.XOR<Prisma.TicketUpdateManyMutationInput, Prisma.TicketUncheckedUpdateManyWithoutUserInput>;
};
export type TicketScalarWhereInput = {
    AND?: Prisma.TicketScalarWhereInput | Prisma.TicketScalarWhereInput[];
    OR?: Prisma.TicketScalarWhereInput[];
    NOT?: Prisma.TicketScalarWhereInput | Prisma.TicketScalarWhereInput[];
    id?: Prisma.UuidFilter<"Ticket"> | string;
    onChainTicketId?: Prisma.IntFilter<"Ticket"> | number;
    numbers?: Prisma.IntNullableListFilter<"Ticket">;
    isWinner?: Prisma.BoolFilter<"Ticket"> | boolean;
    drawId?: Prisma.UuidFilter<"Ticket"> | string;
    userId?: Prisma.UuidFilter<"Ticket"> | string;
    createdAt?: Prisma.DateTimeFilter<"Ticket"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Ticket"> | Date | string;
};
export type TicketCreateWithoutDrawInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTicketsInput;
};
export type TicketUncheckedCreateWithoutDrawInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TicketCreateOrConnectWithoutDrawInput = {
    where: Prisma.TicketWhereUniqueInput;
    create: Prisma.XOR<Prisma.TicketCreateWithoutDrawInput, Prisma.TicketUncheckedCreateWithoutDrawInput>;
};
export type TicketCreateManyDrawInputEnvelope = {
    data: Prisma.TicketCreateManyDrawInput | Prisma.TicketCreateManyDrawInput[];
    skipDuplicates?: boolean;
};
export type TicketUpsertWithWhereUniqueWithoutDrawInput = {
    where: Prisma.TicketWhereUniqueInput;
    update: Prisma.XOR<Prisma.TicketUpdateWithoutDrawInput, Prisma.TicketUncheckedUpdateWithoutDrawInput>;
    create: Prisma.XOR<Prisma.TicketCreateWithoutDrawInput, Prisma.TicketUncheckedCreateWithoutDrawInput>;
};
export type TicketUpdateWithWhereUniqueWithoutDrawInput = {
    where: Prisma.TicketWhereUniqueInput;
    data: Prisma.XOR<Prisma.TicketUpdateWithoutDrawInput, Prisma.TicketUncheckedUpdateWithoutDrawInput>;
};
export type TicketUpdateManyWithWhereWithoutDrawInput = {
    where: Prisma.TicketScalarWhereInput;
    data: Prisma.XOR<Prisma.TicketUpdateManyMutationInput, Prisma.TicketUncheckedUpdateManyWithoutDrawInput>;
};
export type TicketCreateManyUserInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    drawId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TicketUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    draw?: Prisma.DrawUpdateOneRequiredWithoutTicketsNestedInput;
};
export type TicketUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    drawId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    drawId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketCreateManyDrawInput = {
    id?: string;
    onChainTicketId: number;
    numbers?: Prisma.TicketCreatenumbersInput | number[];
    isWinner?: boolean;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TicketUpdateWithoutDrawInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTicketsNestedInput;
};
export type TicketUncheckedUpdateWithoutDrawInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketUncheckedUpdateManyWithoutDrawInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainTicketId?: Prisma.IntFieldUpdateOperationsInput | number;
    numbers?: Prisma.TicketUpdatenumbersInput | number[];
    isWinner?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TicketSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onChainTicketId?: boolean;
    numbers?: boolean;
    isWinner?: boolean;
    drawId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    draw?: boolean | Prisma.DrawDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ticket"]>;
export type TicketSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onChainTicketId?: boolean;
    numbers?: boolean;
    isWinner?: boolean;
    drawId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    draw?: boolean | Prisma.DrawDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ticket"]>;
export type TicketSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onChainTicketId?: boolean;
    numbers?: boolean;
    isWinner?: boolean;
    drawId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    draw?: boolean | Prisma.DrawDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ticket"]>;
export type TicketSelectScalar = {
    id?: boolean;
    onChainTicketId?: boolean;
    numbers?: boolean;
    isWinner?: boolean;
    drawId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TicketOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "onChainTicketId" | "numbers" | "isWinner" | "drawId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["ticket"]>;
export type TicketInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    draw?: boolean | Prisma.DrawDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TicketIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    draw?: boolean | Prisma.DrawDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TicketIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    draw?: boolean | Prisma.DrawDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TicketPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Ticket";
    objects: {
        draw: Prisma.$DrawPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        onChainTicketId: number;
        numbers: number[];
        isWinner: boolean;
        drawId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["ticket"]>;
    composites: {};
};
export type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TicketPayload, S>;
export type TicketCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TicketCountAggregateInputType | true;
};
export interface TicketDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Ticket'];
        meta: {
            name: 'Ticket';
        };
    };
    findUnique<T extends TicketFindUniqueArgs>(args: Prisma.SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TicketFindFirstArgs>(args?: Prisma.SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TicketFindManyArgs>(args?: Prisma.SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TicketCreateArgs>(args: Prisma.SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TicketCreateManyArgs>(args?: Prisma.SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TicketDeleteArgs>(args: Prisma.SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TicketUpdateArgs>(args: Prisma.SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TicketDeleteManyArgs>(args?: Prisma.SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TicketUpdateManyArgs>(args: Prisma.SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TicketUpsertArgs>(args: Prisma.SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TicketCountArgs>(args?: Prisma.Subset<T, TicketCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TicketCountAggregateOutputType> : number>;
    aggregate<T extends TicketAggregateArgs>(args: Prisma.Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>;
    groupBy<T extends TicketGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TicketGroupByArgs['orderBy'];
    } : {
        orderBy?: TicketGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TicketFieldRefs;
}
export interface Prisma__TicketClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    draw<T extends Prisma.DrawDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DrawDefaultArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TicketFieldRefs {
    readonly id: Prisma.FieldRef<"Ticket", 'String'>;
    readonly onChainTicketId: Prisma.FieldRef<"Ticket", 'Int'>;
    readonly numbers: Prisma.FieldRef<"Ticket", 'Int[]'>;
    readonly isWinner: Prisma.FieldRef<"Ticket", 'Boolean'>;
    readonly drawId: Prisma.FieldRef<"Ticket", 'String'>;
    readonly userId: Prisma.FieldRef<"Ticket", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Ticket", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Ticket", 'DateTime'>;
}
export type TicketFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where: Prisma.TicketWhereUniqueInput;
};
export type TicketFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where: Prisma.TicketWhereUniqueInput;
};
export type TicketFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput | Prisma.TicketOrderByWithRelationInput[];
    cursor?: Prisma.TicketWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TicketScalarFieldEnum | Prisma.TicketScalarFieldEnum[];
};
export type TicketFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput | Prisma.TicketOrderByWithRelationInput[];
    cursor?: Prisma.TicketWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TicketScalarFieldEnum | Prisma.TicketScalarFieldEnum[];
};
export type TicketFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput | Prisma.TicketOrderByWithRelationInput[];
    cursor?: Prisma.TicketWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TicketScalarFieldEnum | Prisma.TicketScalarFieldEnum[];
};
export type TicketCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TicketCreateInput, Prisma.TicketUncheckedCreateInput>;
};
export type TicketCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TicketCreateManyInput | Prisma.TicketCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TicketCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    data: Prisma.TicketCreateManyInput | Prisma.TicketCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TicketIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TicketUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TicketUpdateInput, Prisma.TicketUncheckedUpdateInput>;
    where: Prisma.TicketWhereUniqueInput;
};
export type TicketUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TicketUpdateManyMutationInput, Prisma.TicketUncheckedUpdateManyInput>;
    where?: Prisma.TicketWhereInput;
    limit?: number;
};
export type TicketUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TicketUpdateManyMutationInput, Prisma.TicketUncheckedUpdateManyInput>;
    where?: Prisma.TicketWhereInput;
    limit?: number;
    include?: Prisma.TicketIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TicketUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where: Prisma.TicketWhereUniqueInput;
    create: Prisma.XOR<Prisma.TicketCreateInput, Prisma.TicketUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TicketUpdateInput, Prisma.TicketUncheckedUpdateInput>;
};
export type TicketDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where: Prisma.TicketWhereUniqueInput;
};
export type TicketDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TicketWhereInput;
    limit?: number;
};
export type TicketDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
};
export {};
