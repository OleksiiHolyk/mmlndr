package ua.olkywade;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Oleksii on 24.04.2017.
 */
@RepositoryRestResource(collectionResourceRel = "memes", path = "memes")
public interface MemRepository extends MongoRepository<Mem, String> {
    Mem findByShortDescription(@Param("sd") String shortDescription);

    Mem findByFullDescription(@Param("fd") String fullDescription);

    List<Mem> findByDateBetween(@Param("df") Long dateFrom, @Param("dt") Long DateTo);
}
