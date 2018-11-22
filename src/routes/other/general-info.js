import ResourceNotFoundError from '../../errors/resource-not-found';
import ParamMissingError from '../../errors/param-missing';
import database from '../../data/database';
import partyOverrides from '../../data/party-overrides';

const applyOverrides = seatCount =>
    seatCount.map(item => ({
        ...item,
        ...partyOverrides[item.partyAbbreviation],
    }));

const checkMandatoryParties = (seatCount) => {
    const mandatoryParties = Object.keys(partyOverrides)
        .filter(partyAbbreviation => partyOverrides[partyAbbreviation].mandatory)
        .filter(partyAbbreviation => !seatCount.find(party => party.partyAbbreviation === partyAbbreviation))
        .map(partyAbbreviation => ({ partyAbbreviation, seatsWonAhead: 0 }));

    return [...seatCount, ...mandatoryParties];
};

export default async (ctx) => {
    const { electionId } = ctx.params;
    const { areaCode } = ctx.query;

    if (!electionId) ctx.throw(new ParamMissingError('electionId'));
    if (!areaCode) ctx.throw(new ParamMissingError('areaCode'));

    const res = {
        hello: 'other world'
    };

    if (!res) {
        ctx.throw(new ResourceNotFoundError(electionId));
    }

    ctx.body = res;
};
